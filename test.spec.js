var argon2 = process.env.COVERAGE
  ? require('./index-cov')
  : require('./index');

module.exports = {
  test_defaults(assert) {
    'use strict';

    assert.expect(1);

    assert.deepEqual(argon2.defaults, {
      timeCost: 3,
      memoryCost: 12,
      parallelism: 1,
      argon2d: false
    });
    assert.done();
  },

  test_hash(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.equal(hash, '$argon2i$m=4096,t=3,p=1$c29tZXNhbHQAAAAAAAAAAA$FHF/OZ0GJpMRAlBmPTqXxw36Ftp87JllALZPcP9w9gs');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_argon2d(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      argon2d: true
    }, function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.ok(/\$argon2d\$/.test(hash), 'Should have argon2d signature.');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_truthy_argon2d(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      argon2d: 'foo'
    }, function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.ok(/\$argon2d\$/.test(hash), 'Should have argon2d signature.');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_falsy_argon2d(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      argon2d: ''
    }, function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.ok(/\$argon2i\$/.test(hash), 'Should not have argon2d signature.');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_long_salt(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesaltwaytoobig', function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Salt too long, maximum 16 characters.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_time_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      timeCost: 4
    }, function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.ok(/t=4/.test(hash), 'Should have correct time cost.');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_invalid_time_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      timeCost: 'foo'
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Invalid time cost, must be a number.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_low_time_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      timeCost: -4294967290
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Time cost too low, minimum of 1.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_high_time_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      timeCost: 4294967297
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Time cost too high, maximum of 4294967295.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_memory_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      memoryCost: 13
    }, function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.ok(/m=8192/.test(hash), 'Should have correct memory cost.');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_invalid_memory_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      memoryCost: 'foo'
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Invalid memory cost, must be a number.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_low_memory_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      memoryCost: -4294967290
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Memory cost too low, minimum of 1.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_high_memory_cost(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      memoryCost: 32
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Memory cost too high, maximum of 31.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_parallelism(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      parallelism: 2
    }, function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.ok(/p=2/.test(hash), 'Should have correct parallelism.');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_invalid_parallelism(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      parallelism: 'foo'
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Invalid parallelism, must be a number.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_low_parallelism(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      parallelism: -4294967290
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Parallelism too low, minimum of 1.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_high_parallelism(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      parallelism: 4294967297
    }, function (err, hash) {
      assert.ok(err, 'Error should be defined.');
      assert.equal(err.message, 'Parallelism too high, maximum of 4294967295.');
      assert.equal(undefined, hash);
      assert.done();
    });
  },

  test_hash_all_options(assert) {
    'use strict';

    assert.expect(3);

    argon2.hash('password', 'somesalt', {
      timeCost: 4,
      memoryCost: 13,
      parallelism: 2
    }, function (err, hash) {
      assert.ok(hash, 'Hash should be defined.');
      assert.ok(/m=8192,t=4,p=2/.test(hash), 'Should have correct options.');
      assert.equal(undefined, err);
      assert.done();
    });
  },

  test_hash_sync(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt');
    assert.equal(hash, '$argon2i$m=4096,t=3,p=1$c29tZXNhbHQAAAAAAAAAAA$FHF/OZ0GJpMRAlBmPTqXxw36Ftp87JllALZPcP9w9gs');
    assert.done();
  },

  test_hash_argon2d_sync(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt', {
      argon2d: true
    });
    assert.ok(/\$argon2d\$/.test(hash), 'Should use argon2d signature.');
    assert.done();
  },

  test_hash_truthy_argon2d_sync(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt', {
      argon2d: 'foo'
    });
    assert.ok(/\$argon2d\$/.test(hash), 'Should use argon2d signature.');
    assert.done();
  },

  test_hash_falsy_argon2d_sync(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt', {
      argon2d: ''
    });
    assert.ok(/\$argon2i\$/.test(hash), 'Should not use argon2d signature.');
    assert.done();
  },

  test_hash_sync_time_cost(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt', {
      timeCost: 4
    });
    assert.ok(/t=4/.test(hash), 'Should have correct time cost.');
    assert.done();
  },

  test_hash_sync_invalid_time_cost(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        timeCost: 'foo'
      });
    }, /invalid/i);
    assert.done();
  },

  test_hash_sync_low_time_cost(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        timeCost: -4294967290
      });
    }, /too low/);
    assert.done();
  },

  test_hash_sync_high_time_cost(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        timeCost: 4294967297
      });
    }, /too high/);
    assert.done();
  },

  test_hash_sync_memory_cost(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt', {
      memoryCost: 13
    });
    assert.ok(/m=8192/.test(hash), 'Should have correct memory cost.');
    assert.done();
  },

  test_hash_sync_invalid_memory_cost(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        memoryCost: 'foo'
      });
    }, /invalid/i);
    assert.done();
  },

  test_hash_sync_low_memory_cost(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        memoryCost: -4294967290
      });
    }, /too low/);
    assert.done();
  },

  test_hash_sync_high_memory_cost(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      argon2.hashSync('password', 'somesalt', {
        memoryCost: 32
      });
    }, /too high/);
    assert.done();
  },

  test_hash_sync_parallelism(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt', {
      parallelism: 2
    });
    assert.ok(/p=2/.test(hash), 'Should have correct parallelism.');
    assert.done();
  },

  test_hash_sync_invalid_parallelism(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        parallelism: 'foo'
      });
    }, /invalid/i);
    assert.done();
  },

  test_hash_sync_low_parallelism(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        parallelism: -4294967290
      });
    }, /too low/);
    assert.done();
  },

  test_hash_sync_high_parallelism(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      var hash = argon2.hashSync('password', 'somesalt', {
        parallelism: 4294967297
      });
    }, /too high/);
    assert.done();
  },

  test_hash_sync_all_options(assert) {
    'use strict';

    assert.expect(1);

    var hash = argon2.hashSync('password', 'somesalt', {
      timeCost: 4,
      memoryCost: 13,
      parallelism: 2
    });
    assert.ok(/m=8192,t=4,p=2/.test(hash), 'Should have correct options.');
    assert.done();
  },

  test_hash_sync_long_salt(assert) {
    'use strict';

    assert.expect(1);

    assert.throws(function () {
      argon2.hashSync('password', 'somesaltwaytoobig');
    });
    assert.done();
  },

  test_generate_salt(assert) {
    'use strict';

    assert.expect(1);

    argon2.generateSalt(function (err, salt) {
      assert.ok(salt.length <= 16);
      assert.done();
    });
  },

  test_generate_salt_sync(assert) {
    'use strict';

    assert.expect(1);

    assert.ok(argon2.generateSaltSync().length <= 16);
    assert.done();
  },

  test_verify_ok(assert) {
    'use strict';

    assert.expect(1);

    argon2.verify(argon2.hashSync('password', argon2.generateSaltSync()),
      'password', function (err) {
        assert.equal(undefined, err);
        assert.done();
      });
  },

  test_verify_fail(assert) {
    'use strict';

    assert.expect(1);

    argon2.verify(argon2.hashSync('password', argon2.generateSaltSync()),
      'passwolrd', function (err) {
        assert.ok(err, 'Error should be defined.');
        assert.done();
      });
  },

  test_verify_argon2d_ok(assert) {
    'use strict';

    assert.expect(1);

    argon2.hash('password', argon2.generateSaltSync(), {
      argon2d: true
    }, function (err, hash) {
      argon2.verify(hash, 'password', function (err) {
        assert.equal(undefined, err);
        assert.done();
      });
    });
  },

  test_verify_argon2d_fail(assert) {
    'use strict';

    assert.expect(1);

    argon2.hash('password', argon2.generateSaltSync(), {
      argon2d: true
    }, function (err, hash) {
      argon2.verify(hash, 'passwolrd', function (err) {
        assert.ok(err, 'Error should be defined.');
        assert.done();
      });
    });
  },

  test_verify_sync_ok(assert) {
    'use strict';

    assert.expect(1);

    assert.equal(true, argon2.verifySync(argon2.hashSync('password',
      argon2.generateSaltSync()), 'password'));
    assert.done();
  },

  test_verify_sync_fail(assert) {
    'use strict';

    assert.expect(1);

    assert.equal(false, argon2.verifySync(argon2.hashSync('password',
      argon2.generateSaltSync()), 'passworld'));
    assert.done();
  },

  test_verify_argon2d_sync_ok(assert) {
    'use strict';

    assert.expect(1);

    argon2.hash('password', argon2.generateSaltSync(), {
      argon2d: true
    }, function (err, hash) {
      assert.equal(true, argon2.verifySync(hash, 'password'));
      assert.done();
    });
  },

  test_verify_argon2d_sync_fail(assert) {
    'use strict';

    assert.expect(1);

    argon2.hash('password', argon2.generateSaltSync(), {
      argon2d: true
    }, function (err, hash) {
      assert.equal(false, argon2.verifySync(hash, 'passwolrd'));
      assert.done();
    });
  }
};
