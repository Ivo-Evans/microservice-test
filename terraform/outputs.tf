output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.microservices_host.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2"
  value       = aws_instance.microservices_host.public_ip
}