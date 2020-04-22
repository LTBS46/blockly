
Blockly.CPP['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.CPP.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);
  return [code, Blockly.CPP.ORDER_ATOMIC];
};

Blockly.CPP['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.CPP.valueToCode(block, 'VALUE',
      Blockly.CPP.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.CPP.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = ' + argument0 + ';\n';
};
