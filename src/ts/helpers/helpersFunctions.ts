function getUniqueID(): number {
  return Math.floor(Math.random() * Date.now());
}

export { getUniqueID };
