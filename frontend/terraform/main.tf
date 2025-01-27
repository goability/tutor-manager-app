terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  required_version = ">= 1.3.0"
  
  backend "s3" {
    bucket         = "razormath-terraform-state"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "razormath-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = "us-east-1" # ACM for CloudFront must be in us-east-1
}
