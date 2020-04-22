Blockly.CPP['math_single'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.CPP.valueToCode(block, 'NUM',
        Blockly.CPP.ORDER_UNARY_NEGATION) || '0';
    return ['- (' + arg + ')', Blockly.CPP.ORDER_UNARY_SIGN];
  }
  Blockly.CPP.definitions_['#include <math.h>'] = '#include <math.h>';
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.CPP.valueToCode(block, 'NUM',
        Blockly.CPP.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.CPP.valueToCode(block, 'NUM',
        Blockly.CPP.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'fabs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'log(' + arg + ')';
      break;
    case 'LOG10':
      code = 'log10(' + arg + ')';
      break;
    case 'EXP':
      code = 'exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'sin((' + arg + ' / 180.0) * PI)';
      break;
    case 'COS':
      code = 'cos((' + arg + ' / 180.0) * PI)';
      break;
    case 'TAN':
      code = 'tan((' + arg + ' / 180.0) * PI)';
      break;
  }
  if (code) {
    return [code, Blockly.CPP.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ASIN':
      code = '(asin(' + arg + ') / (PI * 180))';
      break;
    case 'ACOS':
      code = '(acos(' + arg + ') / (PI * 180))';
      break;
    case 'ATAN':
      code = '(atan(' + arg + ') / (PI * 180))';
      break;
    default:
      throw Error('Unknown math operator: ' + operator);
  }
  return [code, Blockly.CPP.ORDER_MULTIPLICATIVE];
};

Blockly.CPP['math_number'] = function(block) {
  // Numeric value.
  var code = Number(block.getFieldValue('NUM'));
  var order = code >= 0 ? Blockly.CPP.ORDER_ATOMIC :
              Blockly.CPP.ORDER_UNARY_NEGATION;
  return [code, order];
};
