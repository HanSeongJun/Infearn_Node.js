const mongoose = require('mongoose'); // mongoose 가져오기
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

// 모델 스키마 생성 
const userSchema = mongoose.Schema({
    name: {
        type: String, // name의 type
        maxlength: 50
    },
    email: { 
        type: String,
        trim: true, // 이메일의 공백을 없애주는 역할 
        unique: 1 // 똑같은 이메일을 사용하는 것을 방지 
    },
    password: { 
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // 관리자를 정해주는 역할
        type: Number, // 0 = 일반 유저, 1 = 관리자
        default: 0, // 기본값은 0    
    }, 
    image: String,
    token: { // 유효성 관리
        type:String
    },
    tokenExp: { // token을 사용할 수 있는 기간
        type: Number
    }
})

// 유저 스키마를 실행하기 전 작동 
userSchema.pre('save', function (next) {
    var user = this;
    if( user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { 
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);cb( null, isMatch ) 
    })
} 
 
userSchema.methods.generateToken = function (cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
 
    user.token = token
    user.save( function(err, user) {
        if(err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findbyToken = function(token, cb ) {
    var user = this;

    // 토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id" : decoded, "token": token }, function(err, user ) {
            if(err) return cb(err);
            cb(null, user)

        })
    })
}

// 스키마를 모델로 감싸기 
const User = mongoose.model('User', userSchema)

module.exports = { User } // 외부에서 접근이 가능하도록  