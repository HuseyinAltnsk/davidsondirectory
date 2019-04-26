from Naked.toolshed.shell import execute_js, muterun_js


def main():
    
  response = muterun_js('fetchApi.js')
  if response.exitcode == 0:
    return response.stdout
  else:
    sys.stderr.write(response.stderr)
  
if __name__ == "__main__":
  main()