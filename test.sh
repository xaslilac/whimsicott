#!/bin/bash
domain="${DOMAIN:-"whimsicott.deno.dev"}"

function request {
  local url=$1
  shift
  
  set -x

  curl --header "Content-Type: application/json" \
    "$@" https://${domain}${url}
    
  { set +x; } 2>/dev/null
  
  printf "\n"
}

request /api/puppies --data '{"count":3}'
request /api/puppies --data '{"count":4}'
request /api/puppies --data '{"count":5}'

