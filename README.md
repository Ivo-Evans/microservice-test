# DevOps/microservices

A repo experimenting with modern DevOps and microservice patterns on a small scale

## Ansible
After creating the EC2 instance, the EC2 instance is configured with Ansible. Further modification of the EC2 instance should also be done with Ansible. Steps to get this working

1. Have an EC2 instance and a private keyfile
2. Install ansible on your system
3. edit /etc/ansible/hosts, adding the following info

```
<remote-ip> ansible_user=ubuntu ansible_ssh_private_key_file=<local .pem file>
```

the ansible_user value should be the user of the remote machine - typically ubuntu for unconfigured Ubuntu EC2s

4. From this repo's root directory, `ansible-playbook ./setup.yml` 

## Typescript in the authenticate/ folder

Can be compiled with `npx tsc`

## Docker-compose.yml

`docker-compose up --build`

## NGINX and networking inside Docker compose

- The only that exposes ports to the host computer should be NGINX, which will expose port 80
- Other apps use docker-compose internal networking features to expose ports to each other
- NGINX acts as a reverse proxy for the other apps

Here's a walkthrough of a simple route.

In the `authenticate` express app:

```
app.get('/authorisation/:userId', function (req, res) { ...})
...
app.listen(8080)
```

In docker-compose.yml

```
services: 
  nginx:
    build: nginx/
    networks: 
      - frontnet
    ports: 
      - 80:80

  authenticate:
    build: authenticate/
    networks: 
      - frontnet
    expose: 
      - 8080

networks:
  frontnet:
```

In `nginx/nginx.conf`:

```
server {
    listen 80;
    server_name localhost;
    location /authenticate/ {
        proxy_pass   http://authenticate:8080/;
    }

}
```

Finally, cURL:

```
curl "localhost/authenticate/authorisation/5"
```

Note that NGINX is extremely sensitive to slashes - adding or removing them changes how the url is parsed.

I'll assume you can easily understand Express, but I'll explain the docker-compose and NGINX configurations. The docker-compose.yml contains two services (Docker containers). From a networking point of view, there are four things we're interested in. Firstly, the name of the service. Services are discoverable by their names as hostnames in other services, which is what's happening in the proxy_pass line of the NGINX config. Secondly, the `ports` key in the NGINX service. This maps the NGINX containers internal port 80 to the host machine's port 80. Thirdly, the `expose` key in the authenticate service. This means that the container will be accessible to other containers on this port, however, it won't be accessible externally, e.g. through code. Multiple containers can have the same `expose` port because they're all localised to their service name as a pretend dns name. Finally, the use of `networks` throughout the compose file. I saw this in examples, which had `frontnet` and `backnet`, but haven't dived deep into it or tried to remove it yet. 