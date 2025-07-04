import { Order } from '@/modules/schema/Order';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const generateOrderHTML = (order: Order) => {
  const { customer, date, guest_count, location, budget } = order;

  const itemsHtml = budget.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>R$ ${(item.unit_price).toFixed(2)}</td>
      <td>R$ ${(item.unit_price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <html>
      <body style="font-family: sans-serif; padding: 24px;">
        <h1>Resumo do Orçamento</h1>
        <h2>Cliente</h2>
        <p><strong>Nome:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Telefone:</strong> ${customer.phone}</p>

        <h2>Evento</h2>
        <p><strong>Data:</strong> ${new Date(date.start).toLocaleDateString()} até ${new Date(date.end).toLocaleDateString()}</p>
        <p><strong>Local:</strong> ${location}</p>
        <p><strong>Convidados:</strong> ${guest_count}</p>

        <h2>Estrutura do Bar</h2>
        <p><strong>${budget.bar_structure.name}</strong> - R$ ${budget.bar_structure.price.toFixed(2)}</p>

        <h2>Itens</h2>
        <table border="1" cellpadding="8" cellspacing="0" width="100%">
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Total</th>
          </tr>
          ${itemsHtml}
        </table>

        <h2>Total</h2>
        <p><strong>Valor Total:</strong> R$ ${budget.total_value.toFixed(2)}</p>

        <div style="position: absolute; top: 24px; right: 24px;">
            <img src="https://res.cloudinary.com/duxmkrglm/image/upload/v1748112520/ytc5gf6uj8xi6qijauaw.jpg" alt="Logo" width="100" />
        </div>
      </body>
    </html>
  `;
};

export const shareOrderAsPDF = async (order: Order) => {
  try {
    const html = generateOrderHTML(order);
    const { uri } = await Print.printToFileAsync({ html });

    const newPath = `${FileSystem.documentDirectory}orcamento_${order._id}.pdf`;
    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(newPath, {
        mimeType: 'application/pdf',
        dialogTitle: 'Compartilhar Orçamento PDF',
      });
    } else {
      alert('Compartilhamento não disponível neste dispositivo');
    }
  } catch (error: unknown) {
    console.error('Erro ao compartilhar PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    alert(`Erro ao gerar o PDF para compartilhamento: ${errorMessage}`);
  }
};