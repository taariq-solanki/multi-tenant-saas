#!/bin/bash
# Force install Node 18 on the EB instance
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
yum install -y nodejs
