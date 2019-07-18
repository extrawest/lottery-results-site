#!/usr/bin/env bash
  
  docker rm -vf lucky-numbers-front
  docker run -d \
        --name lucky-numbers-front \
        -p 8080:4000 \
        --restart="always" \
        lucky-numbers-front
