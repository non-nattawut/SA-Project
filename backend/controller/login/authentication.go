package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
	"github.com/non-nattawut/patient-management-system/service"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Personal_ID string `json:"personal_id"`
	Password    string `json:"password"`
}

// LoginResponse token response
type LoginResponse struct {
	Token       string `json:"token"`
	ID          uint   `json:"id"`
	Personal_ID string `json:"personal_id"`
	PositionID  uint   `json:"positionid"`
}

// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var employee entity.Employee

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//** 3: ค้นหาด้วยเลขบัตรประชาชน(Personal_ID) */ // ตรวจสอบว่ามี Personal ID ที่กรอกมาหรือไม่
	if err := entity.DB().Raw("SELECT * FROM employees WHERE personal_id = ?", payload.Personal_ID).Scan(&employee).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(employee.Personal_ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token:       signedToken,
		ID:          employee.ID,
		Personal_ID: employee.Personal_ID,
		PositionID:  *employee.PositionID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}
