
resource "aws_instance" "microservices_host" {
  ami           = "ami-096cb92bb3580c759"
  instance_type = "t2.micro"
  key_name      = "personal-aws-account"

  tags = {
    Name = var.instance_name
  }

  provisioner "remote-exec" {
    inline = ["echo hello world"]
    connection {
      type        = "ssh"
      host        = self.public_ip
      user        = "ubuntu"
      private_key = file(var.ssh_key_private)
    }
  }

  provisioner "local-exec" {
    command = "ansible-playbook -u fedora -i '${self.public_ip},' --private-key ${var.ssh_key_private} ../ansible/install-docker.yml"
  }
}