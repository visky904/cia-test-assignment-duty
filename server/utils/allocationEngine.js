const allocateDuties = (students, rooms, staff) => {
    if (!students.length || !rooms.length || !staff.length) {
        return []; 
    }

    let studentIndex = 0;
    let staffIndex = 0;
    const finalAllocation = [];

    const shuffledStudents = [...students].sort(() => Math.random() - 0.5);

    for (const room of rooms) {
        if (studentIndex >= shuffledStudents.length) break;

        const capacity = room.totalCapacity;
        const studentsInThisRoom = shuffledStudents.slice(studentIndex, studentIndex + capacity);
        
        const assignedStaff = staff[staffIndex % staff.length];
        const staffName = assignedStaff ? assignedStaff.name : "TBD";

        finalAllocation.push({
            roomNumber: room.roomNumber,
            staff: staffName,
            studentCount: studentsInThisRoom.length,
            students: studentsInThisRoom.map(s => ({ 
                rollNo: s.rollNo || "N/A", 
                sem: s.semester || "N/A" 
            }))
        });

        studentIndex += capacity;
        staffIndex++;
    }

    return finalAllocation;
};

module.exports = allocateDuties;