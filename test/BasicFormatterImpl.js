var BasicFormatterImpl = require('../lib/BasicFormatterImpl');
var expect = require('expect.js');

describe('Sql Formater test', function(){

	it('should correctly format basic select sql query', function(){
		var sql = "select * from dual";
		expect(BasicFormatterImpl.format(sql)).to.be("\n    select\n        * \n    from\n        dual");
	});

	it('should correctly format complex select sql query', function(){
		var sql = "SELECT tu_relations_persons.id AS \"sys_id\", sys_main_image.display_name AS \"sys_main_image_name\", sys_files_records.file_record_id AS \"sys_main_image_file_record_id\", sys_main_image.version AS \"sys_main_image_version\", tu_relations_persons.id AS \"id\", tu_relations_persons.firstname AS \"firstname\", tu_relations_persons.lastname AS \"lastname\", tu_relations_persons.description AS \"description\", tu_relations_persons.wears_glasses AS \"wears_glasses\", tu_relations_persons.birthday AS \"birthday\", tu_relations_persons.last_vacation AS \"last_vacation\", tu_relations_persons.country AS \"country\", tu_relations_persons.favorite_food AS \"favorite_food\", tu_relations_persons.salary AS \"salary\", dream_dest_zub.\"dream_dest_idz\"  FROM tu_relations_persons LEFT JOIN files_records sys_files_records ON sys_files_records.record_id = tu_relations_persons.id AND sys_files_records.is_main_image = 1 AND sys_files_records.module_id = 'testunits/relations/persons' LEFT JOIN files sys_main_image ON sys_files_records.file_id = sys_main_image.file_id LEFT JOIN ( SELECT tu_relations_dreams.person_id, string_agg( CAST(tu_relations_dreams.country_id AS CHARACTER VARYING) , '@#@' ORDER BY null) AS \"dream_dest_idz\"  FROM tu_relations_dreams  GROUP BY tu_relations_dreams.person_id  ) dream_dest_zub ON dream_dest_zub.person_id = tu_relations_persons.id    ORDER BY tu_relations_persons.firstname asc, tu_relations_persons.id asc LIMIT 10 OFFSET 10";
		var expectedSql = '\n    SELECT\n        tu_relations_persons.id AS "sys_id",\n        sys_main_image.display_name AS "sys_main_image_name",\n        sys_files_records.file_record_id AS "sys_main_image_file_record_id",\n        sys_main_image.version AS "sys_main_image_version",\n        tu_relations_persons.id AS "id",\n        tu_relations_persons.firstname AS "firstname",\n        tu_relations_persons.lastname AS "lastname",\n        tu_relations_persons.description AS "description",\n        tu_relations_persons.wears_glasses AS "wears_glasses",\n        tu_relations_persons.birthday AS "birthday",\n        tu_relations_persons.last_vacation AS "last_vacation",\n        tu_relations_persons.country AS "country",\n        tu_relations_persons.favorite_food AS "favorite_food",\n        tu_relations_persons.salary AS "salary",\n        dream_dest_zub."dream_dest_idz"  \n    FROM\n        tu_relations_persons \n    LEFT JOIN\n        files_records sys_files_records \n            ON sys_files_records.record_id = tu_relations_persons.id \n            AND sys_files_records.is_main_image = 1 \n            AND sys_files_records.module_id = \'testunits/relations/persons\' \n    LEFT JOIN\n        files sys_main_image \n            ON sys_files_records.file_id = sys_main_image.file_id \n    LEFT JOIN\n        (\n            SELECT\n                tu_relations_dreams.person_id,\n                string_agg( CAST(tu_relations_dreams.country_id AS CHARACTER VARYING) ,\n                \'@#@\' \n            ORDER BY\n                null) AS "dream_dest_idz"  \n            FROM\n                tu_relations_dreams  \n            GROUP BY\n                tu_relations_dreams.person_id  \n        ) dream_dest_zub \n            ON dream_dest_zub.person_id = tu_relations_persons.id    \n    ORDER BY\n        tu_relations_persons.firstname asc,\n        tu_relations_persons.id asc LIMIT 10 OFFSET 10';
		expect(BasicFormatterImpl.format(sql)).to.be(expectedSql);
	});

	it('should correctly format basic update sql query', function(){
		var sql = "UPDATE tu_relations_persons SET sys_date_modified = TIMESTAMP WITH TIME ZONE '2014-10-27T20:00:34.759+00:00', sys_record_modifier = 1, description = 'blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae2' WHERE ((tu_relations_persons.id = 281))";
		var expectedSql = '\n    UPDATE\n        tu_relations_persons \n    SET\n        sys_date_modified = TIMESTAMP WITH TIME ZONE \'2014-10-27T20:00:34.759+00:00\',\n        sys_record_modifier = 1,\n        description = \'blandit congue. In scelerisque scelerisque dui. Suspendisse ac metus vitae2\' \n    WHERE\n        (\n            (\n                tu_relations_persons.id = 281\n            )\n        )';
		expect(BasicFormatterImpl.format(sql)).to.be(expectedSql);
	});

	it('should correctly format basic delete sql query', function(){
		var sql = "DELETE FROM tu_relations_persons WHERE ((tu_relations_persons.id = ?))";
		var expectedSql = '\n    DELETE \n    FROM\n        tu_relations_persons \n    WHERE\n        (\n            (\n                tu_relations_persons.id = ?\n            )\n        )';
		expect(BasicFormatterImpl.format(sql)).to.be(expectedSql);
	});

	it('should correctly handle empty string', function(){
		var sql = "";
		expect(BasicFormatterImpl.format(sql)).to.be("\n    ");
	});

	it('should correctly handle null string', function(){
		var sql = null;
		expect(BasicFormatterImpl.format(sql)).to.be("\n    ");
	});

	it('should correctly handle undefined string', function(){
		var sql = undefined;
		expect(BasicFormatterImpl.format(sql)).to.be("\n    ");
	});
});