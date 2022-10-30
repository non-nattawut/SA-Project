package controller

import (
	govalidator "github.com/asaskevich/govalidator"
	"github.com/non-nattawut/patient-management-system/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /bills

func CreateBill(c *gin.Context) {

	var bill entity.Bill
	var diagnostic entity.Diagnostic
	var employee entity.Employee
	var dispensation entity.Dispensation
	var payment_type entity.Payment_type

	if err := c.ShouldBindJSON(&bill); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	//ค้น employee
	if tx := entity.DB().Where("id = ?", bill.Employee_ID).First(&employee); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 10: ค้นหาด้วย(Diagnostic_ID)
	if tx := entity.DB().Where("id = ?", bill.Diagnostic_ID).First(&diagnostic); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 11: ค้นหาด้วย(Dispensation_ID)
	if tx := entity.DB().Where("id = ?", bill.Dispensation_ID).First(&dispensation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 12: ค้นหาด้วย(Payment_Type_ID)
	if tx := entity.DB().Where("id = ?", bill.Payment_type_ID).First(&payment_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	// 13: สร้าง (d,m,MEDICINE_AMOUNT,TIME_STAMP)
	b := entity.Bill{
		Employee:     employee,
		Diagnostic:   diagnostic,
		Dispensation: dispensation,
		Payment_type: payment_type,
		Bill_Price:   bill.Bill_Price,
		Time_Stamp:   bill.Time_Stamp.Local(),
	}

	if _, err := govalidator.ValidateStruct(b); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 14: บันทึก Bill
	if err := entity.DB().Create(&b).Error; err != nil { // สร้าง DB พร้อมเช็คว่าสร้างสำเร็จหรือไม่
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// GET /bills/:id
func GetBill(c *gin.Context) {

	var bill entity.Bill

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM bills WHERE id = ?", id).Scan(&bill).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

// GET /bills
/*4.=========== เตรียมข้อมูลทั้งหมดให้หน้าจอ ============================================*/
/*5.=========== ดึงข้อมูลทั้งหมดของ Bill =============================================*/
func ListBill(c *gin.Context) {

	var bill []entity.Bill

	if err := entity.DB().Preload("Diagnostic").Preload("Dispensation").Preload("Employee").Preload("Payment_type").Raw("SELECT * FROM bills").Find(&bill).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// DELETE /bills/:id
func DeleteBill(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM bills WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /bills

func UpdateBill(c *gin.Context) {

	var bill entity.Bill

	if err := c.ShouldBindJSON(&bill); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", bill.ID).First(&bill); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&bill).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bill})

}

/*6.=========== ดึงข้อมูลทั้งหมดของ Diagnostic =============================================*/
func ListDiagnostics_Bill(c *gin.Context) {
	var diagnostics []entity.Diagnostic
	if err := entity.DB().Preload("Employee").Preload("Diagnostic_Type").Preload("Disease").Preload("Patient").Raw("SELECT * FROM (SELECT * FROM diagnostics INNER JOIN patients ON diagnostics.patient_id = patients.id ORDER BY id DESC) AS x GROUP BY patient_id").Find(&diagnostics).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": diagnostics})
}

/*6.=========== ดึงข้อมูลทั้งหมดของ Dispensation =============================================*/
func ListDispensations_Bill(c *gin.Context) { // ดึงข้อมูลทุกอย่างใน dispensation
	var dispensations []entity.Dispensation

	if err := entity.DB().Preload("Patient").Raw("SELECT * FROM (SELECT * FROM dispensations INNER JOIN diagnostics ORDER BY id DESC) AS x GROUP BY patient_id ").Find(&dispensations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dispensations})
}
