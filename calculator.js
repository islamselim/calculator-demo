var OP_NONE      = 'none';

var Calculator = {

  aValue: '',
  bValue: '',
  isEnteringAValue: true,
  maxValueLength: 8,
  currentOperator: OP_NONE, 

  init: function(actionKey) {
    
    var elms = $('.num');
    
    $('.num').each(function(index) {

      $(this).click(function() {
        Calculator.pushNumber($(this).val());
      });

    });
    
    $('.action').each(function(index) {

      $(this).click(function() {
        Calculator.performAction($(this).val());
      });

    });

    $('.op').each(function(index) {

      $(this).click(function() {
        Calculator.addOperator($(this).val());
      });

    });
  },
  
  addOperator: function(op) {
    if (op == 'equals' && this.currentOperator != OP_NONE) {
      if (this.isEnteringAValue) {
        this.aValue = this.performMathOperation(true);
      } else {
        this.aValue = this.performMathOperation(false);
        this.isEnteringAValue = true;
      }
      this.bValue = '';
    } else {
      this.currentOperator = op;
    }
    this.updateDisplay();
  },
  
  performMathOperation: function(isSingular) {
    
    var a = this.aValue,
        b = (isSingular) ? this.aValue : this.bValue;
    
    if(a.indexOf('.') !== -1 || b.indexOf('.') !== -1) {
      a = parseFloat(a, 10);
      b = parseFloat(b, 10);
    } else {
      a = parseInt(a, 10);
      b = parseInt(b, 10);
    }

    switch(this.currentOperator) {
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
  },
  
  pushNumber: function(num) {
    var maxValueLength = this.maxValueLength;
    if (this.currentOperator != OP_NONE) {
      this.isEnteringAValue = false;
      if(this.isEnteringAValue) {
        this.isEnteringAValue = false;
      }
    }

    if(this.isEnteringAValue) {
      if (this.aValue.length < maxValueLength) {
        this.aValue += num;
      }
    } else {
      if (this.bValue.length < maxValueLength) {
        this.bValue += num;
      }
    }
    this.updateDisplay();
  },


  performAction: function(action) {
    if(action == 'all-clear') {
      this.reset();
    } else {
      if(this.isEnteringAValue) {
        this.aValue = this.performActionOnValue(action, this.aValue);
      } else {
        this.bValue = this.performActionOnValue(action, this.bValue);
      }
    }
    
    this.updateDisplay();
  },
  
  performActionOnValue: function(action, value) {
    var ret = value;
    if (action == 'modulus') {
      ret = value / 100;
    } else if(action  == 'flip-sign') {
      ret = value * -1;
    }
    return ret;
  },

  updateDisplay: function() {
    var value = this.aValue;
    if(!this.isEnteringAValue) {
      value = this.bValue;
    }

    if(value == '') {
      value = '0';
    }
    
    $('label').html(value);
  },

  reset: function() {
    this.aValue = '';
    this.bValue = '';
    this.isEnteringAValue = true;
    this.currentOperator = OP_NONE;
  }
};

$(window).load(function() {
  Calculator.init();
});

