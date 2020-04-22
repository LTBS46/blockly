Blockly.PHP['math_negate'] = function(block) {
  var value_input = Blockly.PHP.valueToCode(block, 'INPUT', Blockly.PHP.ORDER_ATOMIC);
  // TODO: Assemble PHP into code variable.
  var code = ' - (' + value_input + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.PHP.ORDER_NONE];
};
