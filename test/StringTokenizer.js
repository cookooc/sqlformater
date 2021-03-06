var StringTokenizer = require('../lib/StringTokenizer');
var expect = require('expect.js');

describe('String Tokenizer Test', function(){

	it('should correctly split token', function(){
		var sql = "select * from dual";
		var tokens = new StringTokenizer(sql, /(\(|\)|\+|\*|\/|-|=|<|>|'|`|"|\[|]|,| |\n|\r|\f|\t)/g);
		expect(tokens.tokens.length).to.be(7);
	});

	it('should correctly iter token', function(){
		var sql = "select * from dual";
		var tokens = new StringTokenizer(sql, /(\(|\)|\+|\*|\/|-|=|<|>|'|`|"|\[|]|,| |\n|\r|\f|\t)/g);
		expect(tokens.hasMoreTokens()).to.be(true);
		expect(tokens.nextToken()).to.be("select");
		expect(tokens.hasMoreTokens()).to.be(true);
		expect(tokens.nextToken()).to.be(" ");
		expect(tokens.hasMoreTokens()).to.be(true);
		expect(tokens.nextToken()).to.be("*");
		expect(tokens.hasMoreTokens()).to.be(true);
		expect(tokens.nextToken()).to.be(" ");
		expect(tokens.hasMoreTokens()).to.be(true);
		expect(tokens.nextToken()).to.be("from");
		expect(tokens.hasMoreTokens()).to.be(true);
		expect(tokens.nextToken()).to.be(" ");
		expect(tokens.hasMoreTokens()).to.be(true);
		expect(tokens.nextToken()).to.be("dual");
		expect(tokens.hasMoreTokens()).to.be(false);
	});
});