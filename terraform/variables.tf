variable "instance_name" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
  default     = "microservices_instance"
}

variable "ssh_key_private" {
  description = "location of SSH key to use for infrastructure"
  type        = string
  default     = "/home/ivo/.ssh/personal-aws-account.pem"
}