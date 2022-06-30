#!/usr/bin/env nu

(curl --header "Content-Type: application/json"
  --request POST
  --data '{"count":3}'
  https://whimsicott.deno-local.dev/api/puppies)

(curl --header "Content-Type: application/json"
  --request POST
  --data '{"count":4}'
  https://whimsicott.deno-local.dev/api/puppies)

(curl --header "Content-Type: application/json"
  --request POST
  --data '{"count":5}'
  https://whimsicott.deno-local.dev/api/puppies)
