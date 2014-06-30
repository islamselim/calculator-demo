var OP_NONE          = 'none';
var aValue           = '';
var bValue           = '';
var isEnteringAValue = true;
var maxValueLength   = 8;
var currentOperator  = OP_NONE;

function addOperator(op) {
  if (op == 'equals' && currentOperator != OP_NONE) {
    if (isEnteringAValue) {
      aValue = performMathOperation(true);
    } else {
      aValue = performMathOperation(false);
      isEnteringAValue = true;
    }
    bValue = '';
  } else {
    currentOperator = op;
  }
  updateDisplay();
};

function performMathOperation(isSingular) {
  var a = aValue,
      b = (isSingular) ? aValue : bValue;
  
  if(a.indexOf('.') !== -1 || b.indexOf('.') !== -1) {
    a = parseFloat(a, 10);
    b = parseFloat(b, 10);
  } else {
    a = parseInt(a, 10);
    b = parseInt(b, 10);
  }

  switch(currentOperator) {
    case 'plus':
      a = a + b;
      break;
    case 'minus':
      a = a - b;
      break;
    case 'multiply':
      a = a * b;
      break;
    case 'divide':
      a = a / b;
      break;
  }
  return a + '';
};

function pushNumber(num) {
  if (currentOperator != OP_NONE) {
    window.isEnteringAValue = false;
    if(window.isEnteringAValue) {
      window.isEnteringAValue = false;
    }
  }

  if(isEnteringAValue) {
    if (aValue.length < maxValueLength) {
      window.aValue += num;
    }
  } else {
    if (bValue.length < maxValueLength) {
      window.bValue += num;
    }
  }
  updateDisplay();
};


function performAction(action) {
  if(action == 'all-clear') {
    reset();
  } else {
    if(isEnteringAValue) {
      aValue = performActionOnValue(action, aValue);
    } else {
      bValue = performActionOnValue(action, bValue);
    }
  }
  
  updateDisplay();
};

function performActionOnValue(action, value) {
  var ret = value;
  if (action == 'modulus') {
    ret = value / 100;
  } else if(action  == 'flip-sign') {
    ret = value * -1;
  }
  return ret;
};

function updateDisplay() {
  var value = aValue;
  if(!isEnteringAValue) {
    value = bValue;
  }

  if(value == '') {
    value = '0';
  }

  document.getElementsByTagName('label')[0].innerHTML = value;
};

function reset() {
  aValue = '';
  bValue = '';
  isEnteringAValue = true;
  currentOperator = OP_NONE;
};

var elms = document.getElementsByClassName('num');
for(var i=0, iLen=elms.length; i<iLen;i++) {
  var elm = elms[i];
  elm.onmousedown = function(event) {
    pushNumber(event.target.value);
  }
}

elms =  document.getElementsByClassName('action');
for(var i=0, iLen=elms.length; i<iLen;i++) {
  var elm = elms[i];
  elm.onmousedown = function(event) {
    performAction(event.target.value);
  }
}

elms =  document.getElementsByClassName('op');
for(var i=0, iLen=elms.length; i<iLen;i++) {
  var elm = elms[i];
  elm.onmousedown = function(event) {
    addOperator(event.target.value);
  }
}

