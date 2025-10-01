#!/bin/bash
# Install Node.js 22.x for Amazon Linux (Elastic Beanstalk)
# Use yum package manager instead of apt-get for Amazon Linux

# Add NodeSource repository for Amazon Linux
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -

# Install Node.js using yum (Amazon Linux package manager)
sudo yum install -y nodejs
