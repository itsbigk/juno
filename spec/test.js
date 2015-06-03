var chai   = require('chai'),
expect     = chai.expect,
should     = chai.should(),
testString = 'working test',
testObj    = {
  t1 : 'test obj 1',
  t2 : 'test obj 2'
};

describe('basic tests based on the above variables', function() {

  // testing the variable containing a string
  it('should have the value matching testString', function(done) {
    expect(testString).to.be.a('string').and.equal('working test');
    done();
  });

  // test variable containing an object
  it('should be a should test working', function(done) {
    testString.should.be.a('string').and.equal('working test');
    done();
  });

  it('should identify t1 as a string in the object', function(done) {
    testObj.t1.should.be.a('string').and.equal('test obj 1');
    done();
  });

  it('should identify t2 as a string in the object', function(done) {
    testObj.t2.should.be.a('string').and.equal('test obj 2');
    done();
  });
  // end object testing

});
