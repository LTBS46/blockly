Blockly.CPP = new Blockly.Generator("CPP");
Blockly.CPP.addReservedWords(
  'break,case,catch,class,const,continue,default,delete,do,else,finally,for,if,instanceof,new,return,super,switch,this,throw,try,typeof,void,while,' +
  'enum,struct,template,int,bool,float,double,short,unsigned,signed,char,long,typedef,sizeof' +
  'private,protected,public,static,' +
  'await,' +
  'true,false,' +
  Object.getOwnPropertyNames(Blockly.utils.global).join(',')
);

Blockly.CPP.ORDER_ATOMIC = 0;           // 0 "" ...
Blockly.CPP.ORDER_NEW = 1.1;            // new
Blockly.CPP.ORDER_MEMBER = 1.2;         // . []
Blockly.CPP.ORDER_FUNCTION_CALL = 2;    // ()
Blockly.CPP.ORDER_INCREMENT = 3;        // ++
Blockly.CPP.ORDER_DECREMENT = 3;        // --
Blockly.CPP.ORDER_BITWISE_NOT = 4.1;    // ~
Blockly.CPP.ORDER_UNARY_SIGN = 4;        // + -
Blockly.CPP.ORDER_UNARY_PLUS = 4.2;     // +
Blockly.CPP.ORDER_UNARY_NEGATION = 4.3; // -
Blockly.CPP.ORDER_LOGICAL_NOT = 4.4;    // !
Blockly.CPP.ORDER_TYPEOF = 4.5;         // typeof
Blockly.CPP.ORDER_VOID = 4.6;           // void
Blockly.CPP.ORDER_DELETE = 4.7;         // delete
Blockly.CPP.ORDER_AWAIT = 4.8;          // await
Blockly.CPP.ORDER_EXPONENTIATION = 5.0; // **
Blockly.CPP.ORDER_MULTIPLICATION = 5.1; // *
Blockly.CPP.ORDER_DIVISION = 5.2;       // /
Blockly.CPP.ORDER_MODULUS = 5.3;        // %
Blockly.CPP.ORDER_SUBTRACTION = 6.1;    // -
Blockly.CPP.ORDER_ADDITION = 6.2;       // +
Blockly.CPP.ORDER_BITWISE_SHIFT = 7;    // << >> >>>
Blockly.CPP.ORDER_RELATIONAL = 8;       // < <= > >=
Blockly.CPP.ORDER_IN = 8;               // in
Blockly.CPP.ORDER_INSTANCEOF = 8;       // instanceof
Blockly.CPP.ORDER_EQUALITY = 9;         // == != === !==
Blockly.CPP.ORDER_BITWISE_AND = 10;     // &
Blockly.CPP.ORDER_BITWISE_XOR = 11;     // ^
Blockly.CPP.ORDER_BITWISE_OR = 12;      // |
Blockly.CPP.ORDER_LOGICAL_AND = 13;     // &&
Blockly.CPP.ORDER_LOGICAL_OR = 14;      // ||
Blockly.CPP.ORDER_CONDITIONAL = 15;     // ?:
Blockly.CPP.ORDER_ASSIGNMENT = 16;      // = += -= **= *= /= %= <<= >>= ...
Blockly.CPP.ORDER_YIELD = 17;           // yield
Blockly.CPP.ORDER_COMMA = 18;           // ,
Blockly.CPP.ORDER_NONE = 99;            // (...)

Blockly.CPP.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.CPP.ORDER_FUNCTION_CALL, Blockly.CPP.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.CPP.ORDER_FUNCTION_CALL, Blockly.CPP.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.CPP.ORDER_MEMBER, Blockly.CPP.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.CPP.ORDER_MEMBER, Blockly.CPP.ORDER_FUNCTION_CALL],

  // !(!foo) -> !!foo
  [Blockly.CPP.ORDER_LOGICAL_NOT, Blockly.CPP.ORDER_LOGICAL_NOT],
  // a * (b * c) -> a * b * c
  [Blockly.CPP.ORDER_MULTIPLICATION, Blockly.CPP.ORDER_MULTIPLICATION],
  // a + (b + c) -> a + b + c
  [Blockly.CPP.ORDER_ADDITION, Blockly.CPP.ORDER_ADDITION],
  // a && (b && c) -> a && b && c
  [Blockly.CPP.ORDER_LOGICAL_AND, Blockly.CPP.ORDER_LOGICAL_AND],
  // a || (b || c) -> a || b || c
  [Blockly.CPP.ORDER_LOGICAL_OR, Blockly.CPP.ORDER_LOGICAL_OR]
];

Blockly.CPP.init = function(workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.CPP.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.CPP.functionNames_ = Object.create(null);

  if (!Blockly.CPP.variableDB_) {
    Blockly.CPP.variableDB_ =
        new Blockly.Names(Blockly.CPP.RESERVED_WORDS_);
  } else {
    Blockly.CPP.variableDB_.reset();
  }

  Blockly.CPP.variableDB_.setVariableMap(workspace.getVariableMap());

  var defvars = [];
  // Add developer variables (not created or named by the user).
  var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
  for (var i = 0; i < devVarList.length; i++) {
    defvars.push(Blockly.CPP.variableDB_.getName(devVarList[i],
        Blockly.Names.DEVELOPER_VARIABLE_TYPE));
  }

  // Add user variables, but only ones that are being used.
  var variables = Blockly.Variables.allUsedVarModels(workspace);
  for (var i = 0; i < variables.length; i++) {
    defvars.push(Blockly.CPP.variableDB_.getName(variables[i].getId(),
        Blockly.VARIABLE_CATEGORY_NAME));
  }

  // Declare all of the variables.
  if (defvars.length) {
    Blockly.CPP.definitions_['variables'] =
        'auto ' + defvars.join(', ') + ';';
  }
};

Blockly.CPP.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  var imports = [];
  for (var name in Blockly.CPP.definitions_) {
    var def = Blockly.CPP.definitions_[name];
    if (def.match(/^#include\s+<\S>+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  // Clean up temporary data.
  delete Blockly.CPP.definitions_;
  delete Blockly.CPP.functionNames_;
  Blockly.CPP.variableDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

Blockly.CPP.scrubNakedValue = function(line) {
  return line + ';\n';
};

Blockly.CPP.quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

Blockly.CPP.multiline_quote_ = function(string) {
  // Can't use goog.string.quote since Google's style guide recommends
  // JS string literals use single quotes.
  var lines = string.split(/\n/g).map(Blockly.CPP.quote_);
  return lines.join(' + \'\\n\' +\n');
};

Blockly.CPP.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment,
          Blockly.CPP.COMMENT_WRAP - 3);
      commentCode += Blockly.CPP.prefixLines(comment + '\n', '// ');
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = Blockly.CPP.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.CPP.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : Blockly.CPP.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

Blockly.CPP.getAdjusted = function(block, atId, opt_delta, opt_negate,
    opt_order) {
  var delta = opt_delta || 0;
  var order = opt_order || Blockly.CPP.ORDER_NONE;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  if (delta > 0) {
    var at = Blockly.CPP.valueToCode(block, atId,
        Blockly.CPP.ORDER_ADDITION) || defaultAtIndex;
  } else if (delta < 0) {
    var at = Blockly.CPP.valueToCode(block, atId,
        Blockly.CPP.ORDER_SUBTRACTION) || defaultAtIndex;
  } else if (opt_negate) {
    var at = Blockly.CPP.valueToCode(block, atId,
        Blockly.CPP.ORDER_UNARY_NEGATION) || defaultAtIndex;
  } else {
    var at = Blockly.CPP.valueToCode(block, atId, order) ||
        defaultAtIndex;
  }

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = Number(at) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = at + ' + ' + delta;
      var innerOrder = Blockly.CPP.ORDER_ADDITION;
    } else if (delta < 0) {
      at = at + ' - ' + -delta;
      var innerOrder = Blockly.CPP.ORDER_SUBTRACTION;
    }
    if (opt_negate) {
      if (delta) {
        at = '-(' + at + ')';
      } else {
        at = '-' + at;
      }
      var innerOrder = Blockly.CPP.ORDER_UNARY_NEGATION;
    }
    innerOrder = Math.floor(innerOrder);
    order = Math.floor(order);
    if (innerOrder && order >= innerOrder) {
      at = '(' + at + ')';
    }
  }
  return at;
};
