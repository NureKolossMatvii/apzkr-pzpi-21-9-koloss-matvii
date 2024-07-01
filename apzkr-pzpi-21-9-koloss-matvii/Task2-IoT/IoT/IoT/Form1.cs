using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace IoT
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private async void button1_Click(object sender, EventArgs e)
        {
            var id = textBox1.Text;

            using (var client = new HttpClient())
            {
                string url = "https://localhost:54776/api/AdminProducts/" + id;

                try
                {
                    var response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode();

                    var responseData = await response.Content.ReadAsStringAsync();
                    var product = JsonConvert.DeserializeObject<Product>(responseData);

                    label2.Text = JsonConvert.DeserializeObject<Name>(product.Name).Ua.ToString();
                    label3.Text = product.SalePrice.ToString();
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Error. Message: " + ex.Message);
                }
            }
        }
    }
}
