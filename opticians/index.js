function search(job, locums) {
  const availableLocums = locums.filter(locum => {
    const distToHome = getDistance(locum.homeLat, job.lat, locum.homeLng, job.lng)
    if (distToHome > locum.availRadiusMiles) {
      return false
    }

    const requiredSpecialities = {};

    job.specialities.forEach(({name}) => {
      requiredSpecialities[name] = true
    });

    locum.specialities.forEach(({name}) => {
      delete requiredSpecialities[name]
    });

    const missingSpecialitiesCount = Object.keys(requiredSpecialities).length

    if (missingSpecialitiesCount) {
      return false
    }
    return true
  });

  return availableLocums;
}

function getDistance(x1, x2, y1, y2) {
  return Math.sqrt(
    (x1 - x2) ** 2 + 
    (y1 - y2) ** 2
  )
}


module.exports = {
  search,
}