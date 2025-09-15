export const useKeyEvents = defineStore('keyEvents', {
  state: () => ({
    name: '',
    description: '',
    keyEventSequence: [] as string[],
    keyEventDisplaySequence: [] as string[],
    modifierStatus: [
        { name: 'LT', active: false },
        { name: 'RT', active: false },
    ]
  }),
  actions: {
    async append(keyName: string) {
      this.keyEventSequence.push(keyName)
      for (const mod of this.modifierStatus) {
        if (mod.active) {
          keyName = mod.name + '+' + keyName
        }
      }
      this.keyEventDisplaySequence.push(keyName)
    }
  }
})
