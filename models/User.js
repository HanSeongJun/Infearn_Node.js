const mongoose = require('mongoose') // mongoose 가져오기

// 모델 스키마 생성 
const UserSchema = mongoose.Schema({
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

const User = mongoose.model('User', UserSchema)
module.exports = {User} // 외부에사 접근이 가능하도록 