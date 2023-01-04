# Usage: ui_print [red|none|yellow|white|...] "This is an logged text"
function ui_print {
  local reset="\033[0m"
  local red="\033[31m"
  local green="\033[32m"
  local yellow="\033[33m"
  local cyan="\033[36m"
  local white="\033[37m"

  case "$1" in
  "red")
    printf "$red$2$reset\n"
    ;;
  "green")
    printf "$green$2$reset\n"
    ;;
  "yellow")
    printf "$yellow$2$reset\n"
    ;;
  "cyan")
    printf "$cyan$2$reset\n"
    ;;
  "white")
    printf "$white$2$reset\n"
    ;;
  "none")
    printf "$2\n"
    ;;
  esac
  unset reset red green yellow cyan white
}
