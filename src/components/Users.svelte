<script lang="ts">
  import type { User } from '@/types';
  import Input from './Input.svelte';
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import Icon from './Icon.svelte';
  import { htmlPattern, patternTitles } from '@/patterns';

  export let users: User[];
  export let loggedUser: User | null;
  let loading = false;

  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  function handleDelete(userId: User['id']) {
    Swal.fire({
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
      showLoaderOnConfirm: true,
      async preConfirm() {
        try {
          await fetch(`/api/usuarios/${userId}`, { method: 'DELETE' });

          users = users.filter((user) => user.id !== userId);

          toast.fire({
            icon: 'success',
            title: 'Usuario eliminado exitósamente',
          });
        } catch (error) {
          toast.fire({
            icon: 'error',
            title: (error as Error).message,
          });
        }
      },
    });
  }

  function changeRole({ user, admin }: { user: User; admin: User['admin'] }) {
    const formData = new FormData();
    formData.set('id', user.id);
    formData.set('name', user.name);
    formData.set('email', user.email);
    formData.set('password', ''); // TODO
    formData.set('admin', admin.toString());
    user.userId && formData.set('userId', String(user.userId));

    Swal.fire({
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
      showLoaderOnConfirm: true,
      async preConfirm() {
        try {
          await fetch(`/api/usuarios/${user.id}`, {
            method: 'PUT',
            body: formData,
          });

          users = users.map((savedUser) =>
            savedUser.id === user.id ? { ...user, admin } : savedUser,
          );

          toast.fire({
            icon: 'success',
            title: 'Usuario promovido exitósamente',
          });
        } catch (error) {
          toast.fire({
            icon: 'error',
            title: (error as Error).message,
          });
        }
      },
    });
  }

  async function saveUser(form: HTMLFormElement) {
    const id = crypto.randomUUID();
    const formData = new FormData(form);

    loading = true;

    await fetch(`./api/usuarios/${id}`, {
      method: 'put',
      body: formData,
    });

    loading = false;

    users = users.concat({
      id,
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      password: '',
      admin: false,
      userId: String(loggedUser?.id),
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
    <input type="hidden" name="userId" required value={loggedUser?.id || ''} />
    <table class="table align-middle">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Contraseña</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user, i (user.id)}
          {#if user.id !== loggedUser?.id}
            <tr>
              <td>{i + 1}</td>
              <td>{user.name}</td>
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
                  {#if user.admin}
                    <button
                      type="button"
                      on:click={() => changeRole({ user, admin: false })}
                      class="btn btn-secondary"
                      title="Volver a ser secretario"
                    >
                      <Icon name="emoji-tear-fill" />
                    </button>
                  {:else}
                    <button
                      type="button"
                      on:click={() => changeRole({ user, admin: true })}
                      class="btn btn-primary"
                      title="Promover a administrador"
                    >
                      <Icon name="person-up" />
                    </button>
                  {/if}
                  <button
                    type="button"
                    on:click={() => handleDelete(user.id)}
                    class="btn btn-danger"
                    title="Eliminar"
                  >
                    <Icon name="trash" />
                  </button>
                </div>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <Input
              name="name"
              required
              minlength={3}
              pattern={htmlPattern.name}
              title={patternTitles.name}
              disabled={loading}
            >
              Nombre
            </Input>
          </td>
          <td>
            <Input type="email" name="email" required disabled={loading}
              >Correo electrónico</Input
            >
          </td>
          <td>
            <Input
              type="password"
              name="password"
              required
              pattern={htmlPattern.password}
              title={patternTitles.password}
              disabled={loading}
            >
              Contraseña
            </Input>
          </td>
          <td></td>
          <td>
            <button
              class="btn btn-primary d-flex align-items-center gap-1"
              disabled={loading}
            >
              {#if loading}
                <span class="spniner spinner-border spinner-border-sm"></span>
              {/if}

              Registrar
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </form>
</div>
