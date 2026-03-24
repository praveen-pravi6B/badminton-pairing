function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function countOverlap(advList, intList, lastPairs) {
  if (!lastPairs || lastPairs.length === 0) return 0
  return advList.reduce((acc, adv, i) => {
    const prev = lastPairs.find(
      (p) => p.advanced === adv && p.intermediate === intList[i]
    )
    return acc + (prev ? 1 : 0)
  }, 0)
}

export function createPairs(advancedPlayers, intermediatePlayers, lastPairs = []) {
  const minCount = Math.min(advancedPlayers.length, intermediatePlayers.length)

  const advPool = advancedPlayers.slice(0, advancedPlayers.length)
  const intPool = intermediatePlayers.slice(0, intermediatePlayers.length)

  let bestAdv = shuffle(advPool)
  let bestInt = shuffle(intPool)
  let bestOverlap = countOverlap(
    bestAdv.slice(0, minCount),
    bestInt.slice(0, minCount),
    lastPairs
  )

  for (let attempt = 0; attempt < 20; attempt++) {
    const trialAdv = shuffle(advPool)
    const trialInt = shuffle(intPool)
    const overlap = countOverlap(
      trialAdv.slice(0, minCount),
      trialInt.slice(0, minCount),
      lastPairs
    )
    if (overlap < bestOverlap) {
      bestAdv = trialAdv
      bestInt = trialInt
      bestOverlap = overlap
    }
    if (bestOverlap === 0) break
  }

  const pairs = []
  for (let i = 0; i < minCount; i++) {
    pairs.push({
      advanced: bestAdv[i],
      intermediate: bestInt[i],
      courtNumber: i + 1,
    })
  }

  const unpaired = {
    advanced: bestAdv.slice(minCount),
    intermediate: bestInt.slice(minCount),
  }

  return { pairs, unpaired }
}
