package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

/* medicine */

/** START step 7 ดึงข้อมูลทั้งหมด() */
// GET /medicines
func ListMedicines(c *gin.Context) {
	var medicines []entity.Medicine

	if err := entity.DB().Raw("SELECT * FROM medicines").Scan(&medicines).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": medicines})
}

/** END step 7 ดึงข้อมูลทั้งหมด() */
