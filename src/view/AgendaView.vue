<template>
    <div class="layout-content-wrapper">
        <div class="layout-content">
            <div class="flex flex-column md:flex-row gap-5">
                <Card class="md:w-25rem card p-0">
                    <template #content>
                        <div
                            class="flex justify-content-center align-items-center border-bottom-1 surface-border p-3 lg:p-6">
                            <div class="relative flex align-items-center mr-3">
                                <span :class="icone" data-pc-section="icon"></span>
                            </div>
                            <div class="mr-2">
                                <span class="text-700 font-semibold block">{{ tipoAcao }} Contato</span>
                            </div>
                        </div>
                        <div class="w-full flex row-gap-3 flex-column surface-border p-4">
                            <div class="flex flex-column gap-2">
                                <label for="nome">Nome</label>
                                <InputText id="nome" v-model="nome" />
                            </div>
                            <div class="flex flex-column gap-2">
                                <label for="email">E-mail</label>
                                <InputText id="usemailername" v-model="email" />
                            </div>
                            <div class="flex flex-column gap-2">
                                <label for="telefone">Telefone</label>
                                <InputText id="telefone" v-model="telefone" />
                            </div>

                            <div class="flex flex-column gap-2" tabindex="0">
                                <Button :label="tipoAcao + ' Contato'" class="w-full"
                                    @click.stop="tipoAcao === 'Criar' ? criarContato() : atualizarContato()"></Button>
                                <Button v-if="tipoAcao === 'Atualizar'" severity="secondary" label="Cancelar" class="w-full"
                                    @click.stop="_limparFormulario()"></Button>
                            </div>
                        </div>
                    </template>
                </Card>
                <Card class="flex-1 card p-0">
                    <template #content>
                        <div class="flex flex-column h-full">
                            <div class="flex align-items-center border-bottom-1 surface-border p-3 lg:p-6">
                                <div class="relative flex align-items-center mr-3">
                                    <span class="p-button-icon pi pi-phone" data-pc-section="icon"></span>
                                </div>
                                <div class="mr-2">
                                    <span class="text-700 font-semibold block">Lista de Contatos</span>
                                </div>
                            </div>
                            <div class="p-3 md:px-4 lg:px-6 lg:py-4 mt-2 overflow-y-auto" style="max-height: 53vh">
                                <div>
                                    <div class="grid grid-nogutter mb-4">
                                        <div class="col">
                                            <div class="overflow-x-auto">
                                                <table class="w-full" style="border-collapse:collapse;table-layout:auto;">
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                class="text-left font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                                                Nome</th>
                                                            <th
                                                                class="text-left font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                                                E-mail</th>
                                                            <th
                                                                class="text-left font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                                                Telefone</th>
                                                            <th
                                                                class="text-center font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                                                Ação</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody v-if="contatos">
                                                        <tr v-for="contato in contatos" :key="contato.id">
                                                            <td
                                                                class="text-left py-3 border-bottom-1 surface-border white-space-nowrap">
                                                                {{ contato.nome }}</td>
                                                            <td class="text-left py-3 border-bottom-1 surface-border">
                                                                {{ contato.email }}</td>
                                                            <td class="text-left py-3 border-bottom-1 surface-border">
                                                                {{ contato.telefone }}</td>
                                                            <td class="text-center py-3 border-bottom-1 surface-border">
                                                                <Button rounded class="mr-2" icon="pi pi-pencil"
                                                                    severity="warning" style="width: 2rem;"
                                                                    @click.stop="preencherAtualizarContato(contato)" />
                                                                <Button rounded icon="pi pi-trash" severity="danger"
                                                                    style="width: 2rem;"
                                                                    @click.stop="deletarContato(contato)" />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div v-if="!contatos"
                                                    class="w-full text-center py-3 surface-border white-space-nowrap">
                                                    Nenhum registo encontrado
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import contatosService from "../service/cotatosService";

export default {
    data() {
        return {
            tipoAcao: 'Criar',
            icone: 'p-button-icon pi pi-user-plus',
            id: '',
            nome: '',
            email: '',
            telefone: '',
            contatos: []
        }
    },
    mounted() {
        this.buscarTodosContatos();
    },
    methods: {
        criarContato() {
            let contato = {
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
            }

            contatosService.criarContato(contato).then(() => {
                this.$swal({
                    icon: "success",
                    title: "Contato cadastrado com sucesso!",
                });
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this._limparFormulario();
                this.buscarTodosContatos();
            })
        },

        buscarTodosContatos() {
            contatosService.buscarTodosContatos().then((res) => {
                this.contatos = res.data;
            })
        },

        deletarContato(contato) {
            this.$swal
                .fire({
                    title: `Deseja deletar o contato de ${contato.nome}`,
                    showCancelButton: true,
                    cancelButtonText: "Não",
                    confirmButtonText: "Sim",
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        {
                            contatosService
                                .deletarContato(contato.id)
                                .then(() => {
                                    setTimeout(() => {
                                        this.$swal({
                                            icon: "success",
                                            title: "Contato excluido com sucesso",
                                        });
                                    }, 500);
                                })
                                .catch((error) => {
                                    console.log(error);
                                }).finally(() => {
                                    this.buscarTodosContatos();
                                });
                        }
                    }
                });
        },

        preencherAtualizarContato(contato) {
            this._preencherFormulario(contato);
            this.tipoAcao = 'Atualizar'
            this.icone = 'p-button-icon pi pi-user-edit'
        },

        atualizarContato() {
            let contatoAtualziado = {
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
            }

            console.log(this.id)

            contatosService.atualizarContato(this.id, contatoAtualziado).then((res) => {
                this.$swal({
                    icon: "success",
                    title: "Contato atualizado com sucesso!",
                });
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                this._limparFormulario();
                this.buscarTodosContatos();
            })
        },

        _preencherFormulario(contato) {
            this.id = contato.id
            this.nome = contato.nome;
            this.email = contato.email;
            this.telefone = contato.telefone;
        },

        _limparFormulario() {
            this.id = ''
            this.nome = ''
            this.email = ''
            this.telefone = ''

            this.tipoAcao = 'Criar'
            this.icone = 'p-button-icon pi pi-user-plus'
        }
    }
};
</script>