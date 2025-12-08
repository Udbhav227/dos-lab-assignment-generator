export const assignment3 = [
  {
    id: 1,
    filename: "iaop",
    question: "Integer Arithmetic Operations",
    code: `#!/bin/bash
read a
read b
echo $((a + b))
echo $((a - b))
echo $((a * b))
echo $((a / b))
echo $((a % b))`,
    commands: [
      { cmd: "chmod +x iaop" },
      { cmd: "echo -e \"50\\n10\" | ./iaop", output: "60\n40\n500\n5\n0" }
    ]
  },
  {
    id: 2,
    filename: "faop",
    question: "Floating Point Arithmetic",
    code: `#!/bin/bash
read a
read b
echo "$(echo "$a + $b" | bc -l)"
echo "$(echo "$a - $b" | bc -l)"
echo "$(echo "$a * $b" | bc -l)"
echo "$(echo "scale=4; $a / $b" | bc -l)"`,
    commands: [
      { cmd: "chmod +x faop" },
      { cmd: "echo -e \"5.5\\n2.0\" | ./faop", output: "7.5\n3.5\n11.0\n2.7500" }
    ]
  },
  {
    id: 3,
    filename: "gross_salary",
    question: "Calculate Gross Salary",
    code: `#!/bin/bash
read basic
da=$(echo "scale=4; $basic * 40 / 100" | bc -l)
hra=$(echo "scale=4; $basic * 30 / 100" | bc -l)
gross=$(echo "scale=4; $basic + $da + $hra" | bc -l)
echo "$gross"`,
    commands: [
      { cmd: "chmod +x gross_salary" },
      { cmd: "echo \"10000\" | ./gross_salary", output: "17000.0000" }
    ]
  },
  {
    id: 4,
    filename: "even_odd_count",
    question: "Count Even and Odd Numbers",
    code: `#!/bin/bash
even=0
odd=0
count=0
while [ $count -lt 10 ]
do
  read num
  if [ $((num % 2)) -eq 0 ]; then
    even=$((even + 1))
  else
    odd=$((odd + 1))
  fi
  count=$((count + 1))
done
echo "$even"
echo "$odd"`,
    commands: [
      { cmd: "chmod +x even_odd_count" },
      { cmd: "printf \"1\\n2\\n3\\n4\\n5\\n6\\n7\\n8\\n9\\n10\\n\" | ./even_odd_count", output: "5\n5" }
    ]
  },
  {
    id: 5,
    filename: "profit_loss",
    question: "Calculate Profit or Loss",
    code: `#!/bin/bash
read cost
read sell
if [ "$sell" -gt "$cost" ]; then
  diff=$((sell - cost))
  echo "Profit"
  echo "$diff"
elif [ "$sell" -lt "$cost" ]; then
  diff=$((cost - sell))
  echo "Loss"
  echo "$diff"
else
  echo "No Profit No Loss"
fi`,
    commands: [
      { cmd: "chmod +x profit_loss" },
      { cmd: "echo -e \"100\\n150\" | ./profit_loss", output: "Profit\n50" }
    ]
  },
  {
    id: 6,
    filename: "leap_year",
    question: "Check Leap Year",
    code: `#!/bin/bash
if [ -n "$1" ]; then
  year=$1
else
  year=$(date +%Y)
fi
if [ $((year % 400)) -eq 0 ]; then
  echo "Leap Year"
elif [ $((year % 100)) -eq 0 ]; then
  echo "Not a Leap Year"
elif [ $((year % 4)) -eq 0 ]; then
  echo "Leap Year"
else
  echo "Not a Leap Year"
fi`,
    commands: [
      { cmd: "chmod +x leap_year" },
      { cmd: "./leap_year 2024", output: "Leap Year" }
    ]
  },
  {
    id: 7,
    filename: "allow",
    question: "Exam Eligibility",
    code: `#!/bin/bash
read internal_mark
read attendance_percentage
if [ "$internal_mark" -ge 20 ] && [ "$attendance_percentage" -ge 75 ]; then
  echo "Allowed for Semester"
else
  echo "Not allowed"
fi`,
    commands: [
      { cmd: "chmod +x allow" },
      { cmd: "echo -e \"22\\n80\" | ./allow", output: "Allowed for Semester" }
    ]
  },
  {
    id: 8,
    filename: "large3",
    question: "Largest of 3 Numbers",
    code: `#!/bin/bash
a=$1
b=$2
c=$3
largest=$a
if [ "$b" -gt "$largest" ]; then
  largest=$b
fi
if [ "$c" -gt "$largest" ]; then
  largest=$c
fi
echo "$largest"`,
    commands: [
      { cmd: "chmod +x large3" },
      { cmd: "./large3 12 7 25", output: "25" }
    ]
  },
  {
    id: 9,
    filename: "check_char",
    question: "Character Type Checker",
    code: `#!/bin/bash
read input
if [ "\${#input}" -gt 1 ]; then
  echo "You have entered more than one character."
  exit 0
fi
case "$input" in
  [a-z])
    echo "You entered a lower case alphabet"
    ;;
  [A-Z])
    echo "You entered an upper case alphabet."
    ;;
  [0-9])
    echo "You have entered a digit."
    ;;
  *)
    echo "You have entered a special symbol."
    ;;
esac`,
    commands: [
      { cmd: "chmod +x check_char" },
      { cmd: "echo \"a\" | ./check_char", output: "You entered a lower case alphabet" }
    ]
  },
  {
    id: 10,
    filename: "class_time",
    question: "Class Schedule",
    code: `#!/bin/bash
read day
d=$(echo "$day" | tr '[:upper:]' '[:lower:]')
case "$d" in
  sunday)
    echo "Holiday"
    ;;
  monday)
    echo "DOS class time: 10:00 AM Room 101"
    ;;
  tuesday)
    echo "DOS class time: 10:00 AM Room 101"
    ;;
  wednesday)
    echo "DOS class time: 10:00 AM Room 101"
    ;;
  thursday)
    echo "DOS class time: 10:00 AM Room 101"
    ;;
  friday)
    echo "DOS class time: 10:00 AM Room 101"
    ;;
  saturday)
    echo "No class on Saturday"
    ;;
  *)
    echo "No class on $day"
    ;;
esac`,
    commands: [
      { cmd: "chmod +x class_time" },
      { cmd: "echo \"Sunday\" | ./class_time", output: "Holiday" }
    ]
  },
  {
    id: 11,
    filename: "filechk",
    question: "Compare Files",
    code: `#!/bin/bash
file1=$1
file2=$2
if cmp -s "$file1" "$file2"; then
  echo "Files $file1 and $file2 have same content."
  rm -f "$file2"
  echo "So $file2 is deleted."
else
  echo "Files $file1 and $file2 have different content."
fi`,
    commands: [
      { cmd: "cat > file1.txt << 'EOF'\nhello\nworld\nEOF" },
      { cmd: "cat > file2.txt << 'EOF'\nhello\nworld\nEOF" },
      { cmd: "chmod +x filechk" },
      { cmd: "./filechk file1.txt file2.txt", output: "Files file1.txt and file2.txt have same content.\nSo file2.txt is deleted." }
    ]
  },
  {
    id: 12,
    filename: "calculator",
    question: "Simple Calculator",
    code: `#!/bin/bash
if [ "$#" -ne 3 ]; then
  echo "Invalid input"
  echo "Enter input in following format:        op1 operator op2"
  exit 0
fi
op1=$1
operator=$2
op2=$3
case "$operator" in
  +)
    result=$(echo "$op1 + $op2" | bc -l)
    ;;
  -)
    result=$(echo "$op1 - $op2" | bc -l)
    ;;
  x)
    result=$(echo "$op1 * $op2" | bc -l)
    ;;
  "/")
    result=$(echo "scale=4; $op1 / $op2" | bc -l)
    ;;
  %)
    result=$(echo "$op1 % $op2" | bc -l)
    ;;
  ^)
    result=$(echo "$op1 ^ $op2" | bc -l)
    ;;
  *)
    echo "Invalid input"
    echo "Enter input in following format:        op1 operator op2"
    exit 0
    ;;
esac
echo "$op1 $operator $op2 = $result"`,
    commands: [
      { cmd: "chmod +x calculator" },
      { cmd: "./calculator 12 + 5", output: "12 + 5 = 17" }
    ]
  }
];