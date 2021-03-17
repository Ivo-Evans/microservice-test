# DevOps/microservices

A repo experimenting with modern DevOps and microservice patterns on a small scale

## Infrastructure

Infrastructure is provisioned with Terraform, and then with Ansible. To use this, you will need:

- the AWS CLI, with a user configured
- The Terraform CLI
- The Ansible CLI
- An AWS private ssh key.

To create the infrastructure, first edit the `"ssh_key_private"` variable in `terraform/variables.tf` for your own ssh key. Then, to create the infrastructure, run `terraform apply`. An EC2 instance will be created, and Docker and Docker-compose installed in it after you type `yes` to add the ssh fingerprint. The EC2 instance has very open policies by default.

n.b. that the terraform state will be saved locally when you do this - this is fine if every command you run will be run locally, but if the state that the Terraform CLI has access to differs from AWS, you will likely end up with duplicate resources.  

In a production environment, you would want to configure a 'backend' for state.

Here are some useful commands:

| command | purpose |
| - | - |
| terraform init | Installs dependencies for the project. Run once. |
| terraform fmt | prettify your .tf files |
| terraform apply | apply tf plan or changes to tf plan |
| terraform destroy | destroy all infrastructure in terraform state |

### A note on Ansible

Ansible can be used completely independently of Terraform - in fact to use them together, as I have, you have to jump through some hoops. 

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