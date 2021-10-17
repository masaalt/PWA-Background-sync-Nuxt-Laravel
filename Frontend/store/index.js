export const actions = {
  async postIncidents () {
    const res = await this.$axios.post('/articles', { title: this.title, body: this.body })
    return res
  }
}
