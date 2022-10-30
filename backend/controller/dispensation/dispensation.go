package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* --- ระบบสั่งจ่ายยา --- */
/* Dispensation */

// POST /dispensation/
func CreateDispensation(c *gin.Context) { // gin.Context มีรายละเอียดของ request, validates, จัดรูปแบบเป็น JSON
	var dispensation entity.Dispensation
	var patient entity.Patient

	if err := c.ShouldBindJSON(&dispensation); err != nil { // ตรวจสอบว่า JSON ที่ผ่านเข้ามามีรูปแบบตรงกับที่กำหนดไว้ในDBหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหาด้วย(Patient_ID)
	if tx := entity.DB().Where("id = ?", dispensation.Patient_ID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 11: สร้าง(Dispensation_ID, p, currentEmployee)
	d := entity.Dispensation{
		Patient:     patient,                  // โยงฐานข้อมูล
		Employee_ID: dispensation.Employee_ID, // ตรงนี้ใช้เป็นการเซ็ตค่าเนื่องจากมีการต้นหามาแล้วตั้งแต่การ login
	}

	// 12: บันทึก_Dispensation
	if err := entity.DB().Create(&d).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": d}) // respone ว่าผ่าน และส่งข้อมูลกลับไป
}

/** START step 5 ดึงข้อมูลทั้งหมด() */
// GET /dispensations
func ListDispensations(c *gin.Context) { // ดึงข้อมูลทุกอย่างใน dispensation
	var dispensations []entity.Dispensation

	if err := entity.DB().Raw("SELECT * FROM dispensations").Scan(&dispensations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensations})
}

/** END step 5 ดึงข้อมูลทั้งหมด() */

// GET /dispensations_table
func ListDispensationsTable(c *gin.Context) { // ดึงข้อมูลทุกอย่างใน dispensation รวมถึงข้อมูลในตารางที่ติด foriegn key
	var dispensations []entity.Dispensation

	// ต้องมี preload เพื่อโหลดข้อมูลในตารางที่มี FK อยู่
	if err := entity.DB().Preload("Patient").Preload("Employee").Raw("SELECT * FROM dispensations").Find(&dispensations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensations})
}

func ListDispensations_Bill(c *gin.Context) { // ดึงข้อมูลทุกอย่างใน dispensation
	var dispensations []entity.Dispensation

	if err := entity.DB().Preload("Patient").Raw("SELECT * FROM (SELECT * FROM dispensations INNER JOIN diagnostics ORDER BY id DESC) AS x GROUP BY patient_id ").Find(&dispensations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensations})
}
