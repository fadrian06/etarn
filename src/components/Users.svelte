<script lang="ts">
  import type { User } from '@/types';
  import Input from './Input.svelte';
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import Icon from './Icon.svelte';

  export let users: User[];

  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  async function handleDelete(userId: string) {
    const { isConfirmed } = await Swal.fire({
      icon: 'question',
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary',
      },
    });

    if (isConfirmed) {
      await fetch(`/api/usuarios/${userId}`, { method: 'DELETE' });

      users = users.filter((user) => user.id !== userId);

      toast.fire({
        icon: 'success',
        title: 'Usuario eliminado exitósamente',
      });
    }
  }

  async function saveUser(form: HTMLFormElement) {
    const id = crypto.randomUUID();
    const formData = new FormData(form);

    await fetch(`./api/usuarios/${id}`, {
      method: 'put',
      body: formData,
    });

    users = users.concat({
      id,
      email: formData.get('email'),
      password: '',
      admin: false,
      userId: null,
    });

    form.reset();
    toast.fire({
      icon: 'success',
      title: 'Usuario registrado exitósamente',
    });
  }
</script>

<div class="table-responsive">
  <form
    method="post"
    on:submit|preventDefault={(event) => saveUser(event.currentTarget)}
  >
    <table class="table align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Correo</th>
          <th>Contraseña</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user, i (user.id)}
          <tr>
            <td>{i + 1}</td>
            <td>{user.email}</td>
            <td>********</td>
            <td>
              {#if user.admin}
                <span class="badge text-bg-primary">Administrador</span>
              {:else}
                <span class="badge text-bg-info">Secretario</span>
              {/if}
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  on:click={() => handleDelete(user.id)}
                  class="btn btn-danger"
                >
                  <Icon name="trash" />
                </button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <Input type="email" name="email" required>Correo electrónico</Input>
          </td>
          <td>
            <Input type="password" name="password" required>Contraseña</Input>
          </td>
          <td></td>
          <td>
            <button class="btn btn-primary">Registrar</button>
          </td>
        </tr>
      </tfoot>
    </table>
  </form>
</div>
