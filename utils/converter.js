const arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const roman = [
  "M",
  "CM",
  "D",
  "CD",
  "C",
  "XC",
  "L",
  "XL",
  "X",
  "IX",
  "V",
  "IV",
  "I",
];

const map_before = ["IV", "IX", "XL", "XC", "CD", "CM"];

const map_after = ["IIII", "VIIII", "XXXX", "LXXXX", "CCCC", "DCCCC"];

export const ArabicToRomanConverter = (props) => {
  let val = Number(props);
  console.log(val);
  let res = [];
  for (let i = 0; i < arabic.length; i++) {
    const quotient = Math.trunc(val / arabic[i]);
    if (quotient != 0) {
      res += roman[i].repeat(quotient);
      val -= arabic[i] * quotient;
    }
  }
  return res;
};

export const RomanToArabicConverter = (props) => {
  for (let i = 0; i < 6; i++) {
    props = props.replace(map_before[i], map_after[i]);
  }
  let res = 0;
  for (let i = props.length - 1; i > -1; i--) {
    const index = roman.indexOf(props.charAt(i));
    res += arabic[index];
  }
  console.log(res);
  return res;
};
