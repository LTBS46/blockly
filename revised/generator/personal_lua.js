Blockly.Lua['math_negate'] = function(block) {
  var value_input = Blockly.Lua.valueToCode(block, 'INPUT', Blockly.Lua.ORDER_ATOMIC);
  // TODO: Assemble Lua into code variable.
  var code = '- (' + value_input + ')';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Lua.ORDER_NONE];
};
