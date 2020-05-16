#!/bin/bash
# https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/

# Recreate config file
targetFolder=./public
target=${targetFolder}/env-config.js

rm -rf $target || true
mkdir -p $targetFolder || true
touch $target

# Add assignment
echo "window._env_ = {" >> $target

# Read each line in .env file
# Each line represents key=value pairs
while read -r line || [[ -n "$line" ]];
do

  # skip empty lines
  if [[ -z $line ]] ; then
    continue
  fi

  # skip comments
  if [[ $line = \#* ]] ; then
    continue
  fi

  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")
  # Otherwise use value from .env file
  [[ -z $value ]] && value=${varvalue}

  # Append configuration property to JS file
  echo "  $varname: \"$value\"," >> $target
done < .env

echo "}" >> $target