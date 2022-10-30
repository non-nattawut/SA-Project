package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

// POST /diagnostics
func CreateDiagnostic(c *gin.Context) {

	var diagnostic entity.Diagnostic
	var diagnostictype entity.Diagnostic_Type
	var disease entity.Disease
	var patient entity.Patient
	var doctor entity.Employee

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร diagnostic
	if err := c.ShouldBindJSON(&diagnostic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา diagnostictype ด้วย id
	if tx := entity.DB().Where("id = ?", diagnostic.Diagnostic_TypeID).First(&diagnostictype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnostic_type not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", diagnostic.Disease_ID).First(&disease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "disease not found"})
		return
	}

	// 10: ค้นหา disease ด้วย id
	if tx := entity.DB().Where("id = ?", diagnostic.Patient_ID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", diagnostic.Employee_ID).First(&doctor); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 12: สร้าง Diagnostic
	d := entity.Diagnostic{
		Diagnostic_Type: diagnostictype,     // โยงความสัมพันธ์กับ Entity Diagnostic_Type
		Disease:         disease,            // โยงความสัมพันธ์กับ Entity Disease
		Patient:         patient,            // โยงความสัมพันธ์กับ Entity Patient
		Employee:        doctor,             // โยงความสัมพันธ์กับ Entity Employee
		Symptom:         diagnostic.Symptom, // ตั้งค่าฟิลด์ Symptom
	}

	// 13: บันทึก
	if err := entity.DB().Create(&d).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": d})
}

// GET /diagnostic/:id
func GetDiagnostic(c *gin.Context) {
	var diagnostic entity.Diagnostic
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&diagnostic); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnostic not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": diagnostic})
}

// GET /diagnostic
func ListDiagnostics(c *gin.Context) {
	var diagnostics []entity.Diagnostic
	if err := entity.DB().Preload("Diagnostic_Type").Preload("Disease").Preload("Patient").Raw("SELECT * FROM diagnostics").Find(&diagnostics).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diagnostics})
}

// DELETE /diagnostics/:id
func DeleteDiagnostic(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM diagnostics WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnostic not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /diagnostics
func UpdateDiagnostic(c *gin.Context) {
	var diagnostic entity.Diagnostic
	if err := c.ShouldBindJSON(&diagnostic); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", diagnostic.ID).First(&diagnostic); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "diagnostic not found"})
		return
	}

	if err := entity.DB().Save(&diagnostic).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diagnostic})
}

func ListDiagnostics_Bill(c *gin.Context) {
	var diagnostics []entity.Diagnostic
	if err := entity.DB().Preload("Employee").Preload("Diagnostic_Type").Preload("Disease").Preload("Patient").Raw("SELECT * FROM (SELECT * FROM diagnostics ORDER BY id DESC) AS x GROUP BY patient_id ").Find(&diagnostics).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diagnostics})
}
