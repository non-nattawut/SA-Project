package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* Dispensation Medicine */
// POST /dispensation_medicines
func CreateDispensationMedicine(c *gin.Context) { // gin.Context มีรายละเอียดของ request, validates, จัดรูปแบบเป็น JSON
	var dispensation_medicine entity.Dispensation_Medicine
	var medicine entity.Medicine
	var dispensation entity.Dispensation

	if err := c.ShouldBindJSON(&dispensation_medicine); err != nil { // ตรวจสอบว่า JSON ที่ผ่านเข้ามามีรูปแบบตรงกับที่กำหนดไว้ในDBหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เช็คว่าหากไม่มีการป้อนจำนวนยามาจะแจ้ง error ออกไป
	if dispensation_medicine.Medicine_Amount == 0 { // เนื่องจาก Number() ใน React หากเจอ null / undefined จะ return 0
		c.JSON(http.StatusBadRequest, gin.H{"error": "medicine amount invalid"})
		return
	}

	// 13: ค้นหาด้วย(Medicine_ID)
	if tx := entity.DB().Where("id = ?", dispensation_medicine.Medicine_ID).First(&medicine); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 14: ค้นหาด้วยไอดี(Dispensation_ID)
	if tx := entity.DB().Where("id = ?", dispensation_medicine.Dispensation_ID).First(&dispensation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 15: สร้าง (d,m,MEDICINE_AMOUNT,TIME_STAMP)
	dm := entity.Dispensation_Medicine{
		Dispensation:    dispensation,
		Medicine:        medicine,
		Medicine_Amount: dispensation_medicine.Medicine_Amount,
		Time_Stamp:      dispensation_medicine.Time_Stamp.Local(),
	}

	// 16: บันทึก_Dispensation_Medicine
	if err := entity.DB().Create(&dm).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dm}) // respone ว่าผ่าน และส่งข้อมูลกลับไป
}

// GET /dispensation_medicines
func ListDispensationMedicinesTable(c *gin.Context) {
	var dispensation_medicines []entity.Dispensation_Medicine

	/*** ตอนแสดงผลตารางต้องมี prepload ***/
	if err := entity.DB().Preload("Medicine").Raw("SELECT * FROM dispensation_medicines").Find(&dispensation_medicines).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensation_medicines})
}
