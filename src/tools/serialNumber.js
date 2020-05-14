/**
 * 流水号生成器
 * @param {编号} bit int
 * @param {需要的位数} num int
 */
function serialNumber(bit, num) {
  bit = parseInt(bit);
  num = parseInt(num);
  let newBit = bit.toString();
  if (newBit.length > num) return false;
  if (newBit.length === num) return num;
  console.log()
  let fillNum = num - newBit.length, str = '';
  for (let i = 0; i < fillNum; i++) {
    str += '0'
  }
  console.log('fillNum', fillNum, str + bit)
  return str + bit;
}
module.exports = serialNumber;
