Blockly.Dart['math_negate'] = function(block) {
  var value_input = Blockly.Dart.valueToCode(block, 'INPUT', Blockly.Dart.ORDER_ATOMIC);
  // TODO: Assemble Dart into code variable.
  var code = '- (' + value_input + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Dart.ORDER_NONE];
};
