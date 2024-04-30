<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>
      <div class="container">
        <!-- table -->
        <table>
          <!-- head -->
          <p style="text-align: center">
            <span>debug: sort: {{ currentSort }}, dir: {{ currentSortDir }},</span>
            <span>page: {{ this.page.current }}, length: {{ this.page.length }}</span>
          </p>
          <thead>
            <tr>
              <th @click="sort('name')">Name ↓</th>
              <th @click="sort('age')">Age ↓</th>
              <th @click="sort('gender')">Gender ↓</th>
            </tr>
          </thead>

          <!-- body -->
          <tbody>
            <tr v-for="(user, index) in usersSort" :key="index">
              <td>
                <img :src="user.picture.large" :alt="user.name" />
                <span>{{ user.name ? user.name : "-" }}</span>
              </td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="button-list">
          <div class="btn btnPrimary" @click="prevPage">←</div>
          <div class="btn btnPrimary" @click="nextPage">→</div>
        </div>
      </div>
    </section>
  </div>
</template>
  
<script>
import axios from "axios";
export default {
  name: "usersPage",
  data() {
    return {
      users: [],
      currentSort: "name",
      currentSortDir: "asc",
      page: {
        current: 1,
        length: 5,
      },
    };
  },
  async created() {
    await this.getList(1);
  },
  computed: {
    usersSort() {
      let usersRes = this.users || [];
      usersRes.sort((a, b) => {
        let mod = 1;
        if (this.currentSortDir === "desc") mod = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
        return 0;
      });
      usersRes.filter((row, index) => {
        let start = (this.page.current - 1) * this.page.length;
        let end = this.page.current * this.page.length;
        if (index >= start && index < end) return true;
      });
      return usersRes;
    },
  },
  methods: {
    async getList(page) {
      await axios
        .get(`https://randomuser.me/api/?results=5&page=${page}`)
        .then((response) => {
          const result = response.data.results;
          if (result) {
            this.users = result.map?.((item) => ({
              ...item,
              age: item?.dob?.age || 0,
              name: item?.name?.first || "",
            }));
          } else {
            this.users = [];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = e;
    },
    //  pagination
    prevPage() {
      if (this.page.current > 1) {
        this.page.current -= 1;
        this.getList(this.page.current);
      }
    },
    nextPage() {
      if (this.page.current < this.page.length) {
        this.page.current += 1;
        this.getList(this.page.current);
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
img {
  width: 60px;
  height: auto;
  border-radius: 50%;
  margin-right: 15px;
}
.button-list {
  width: 100%;
  text-align: center;
  .btn {
    border-radius: 60px;
    margin: 0 20px;
  }
}
</style>