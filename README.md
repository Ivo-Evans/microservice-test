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

