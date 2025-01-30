<template>
  <tr v-for="(item, index) in list" :key="index">
    <td class="text-center"><img class="bg-soft-primary rounded img-fluid avatar-40 me-3" :src="item.url" alt="profile" loading="lazy" /></td>
    <td>{{ item.title }}</td>
    <td>{{ item.enddate }}</td>
    <td>{{ item.type }}</td>
    <td>{{ item.fileslocation }}</td>
    <td>
      <div class="flex align-items-center list-user-action">
        <a class="btn btn-sm btn-icon btn-warning mx-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Edit" href="#">
          <span class="btn-inner">
            <icon-component type="outlined" icon-name="eye" />
          </span>
        </a>
        <a class="btn btn-sm btn-icon btn-danger mx-1" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Delete" href="#">
          <span class="btn-inner">
            <icon-component type="outlined" icon-name="trash" />
          </span>
        </a>
      </div>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    name: { type: String, default: '' },
    image: { type: String, default: '' },
    contact: { type: String, default: '' },
    email: { type: String, default: '' },
    country: { type: String, default: '' },
    status: { type: String, default: '' },
    company: { type: String, default: '' },
    date: { type: String, default: '' },
    color: { type: String, default: '' }
  }
}
</script>
