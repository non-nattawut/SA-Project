package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/non-nattawut/patient-management-system/entity"
)

// GET /BloodGroups/:id
func ListBloodGroups(c *gin.Context) {
	var bloodGroups []entity.BloodGroups
	if err := entity.DB().Raw("SELECT * FROM blood_groups").Scan(&bloodGroups).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": bloodGroups})
}
