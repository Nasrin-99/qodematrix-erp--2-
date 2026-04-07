const attendanceService = {
  getStats: async () => {
    // later you can call API here
    return {
      totalStudents: 100,
      present: 80,
      absent: 20
    }
  }
}

export default attendanceService