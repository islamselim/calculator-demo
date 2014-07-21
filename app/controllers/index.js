import Ember from 'ember';

var OP_NONE      = 'none';

var Calculator = Ember.Controller.extend({

  aValue: '',
  bValue: '',
  isEnteringAValue: true,
  maxValueLength: 8,
  currentOperator: OP_NONE, 
  
  actions: {
    
    performAction: function(action) {
      if(action === 'all-clear') {
        this.reset();
      } else {
        if(this.get('isEnteringAValue')) {
          this.set('aValue', this.performActionOnValue(action, this.get('aValue')));
        } else {
          this.set('bValue', this.performActionOnValue(action, this.get('bValue')));
        }
      }
    },

    pushNumber: function(num) {
      var maxValueLength = this.get('maxValueLength');
      if (this.get('currentOperator') !== OP_NONE) {
        this.set('isEnteringAValue', false);
      }

      if(this.get('isEnteringAValue')) {
        var aValue = this.get('aValue');
        if (aValue.length < maxValueLength) {
          aValue += num;
          this.set('aValue', aValue);
        }
      } else {
        var bValue = this.get('bValue');
        if (bValue.length < maxValueLength) {
          bValue += num;
          this.set('bValue', bValue);
        }
      }
    },
  
    performOperation: function(op) {
      if (op === 'equals' && this.get('currentOperator') !== OP_NONE) {
        if (this.get('isEnteringAValue')) {
          this.set('aValue', this.performMathOperation(true));
        } else {
          this.set('aValue', this.performMathOperation(false));
          this.set('isEnteringAValue', true);
        }
        this.set('bValue', '');
      } else {
        this.set('currentOperator', op);
      }
    }
  },
    
  performMathOperation: function(isSingular) {
    
    var a = this.get('aValue'),
        b = (isSingular) ? a : this.get('bValue');
    
    if(a.indexOf('.') !== -1 || b.indexOf('.') !== -1) {
      a = parseFloat(a, 10);
      b = parseFloat(b, 10);
    } else {
      a = parseInt(a, 10);
      b = parseInt(b, 10);
    }

    switch(this.get('currentOperator')) {
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
  
  performActionOnValue: function(action, value) {
    var ret = value;
    if (action === 'modulus') {
      ret = value / 100;
    } else if(action  === 'flip-sign') {
      ret = value * -1;
    }
    return ret;
  },

  displayValue: function() {
    var value = this.get('aValue');
    if(!this.get('isEnteringAValue')) {
      value = this.get('bValue');
    }

    if(value === '') {
      value = '0';
    }
    
    return value;
  }.property('aValue', 'bValue'),

  reset: function() {
    this.set('aValue', '')
        .set('bValue', '')
        .set('isEnteringAValue', true)
        .set('currentOperator', OP_NONE);
  }
  
  
});

export default Calculator;
