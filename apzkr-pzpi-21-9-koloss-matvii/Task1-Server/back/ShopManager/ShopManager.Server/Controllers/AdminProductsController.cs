using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Requests;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public AdminProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] AdminProductsRequest request)
        {
            try
            {
                var products = await _productService.GetAllAsync(request);
                var profit = await _productService.GetProfitAsync(request);
                return Ok(new AdminProductsResponse()
                {
                    PageInfo = products,
                    Profit = profit
                });
            }
            catch (InvalidOperationException e)
            {
                return BadRequest(e.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<Product> Get(Guid id)
        {
            return await _productService.Get(id);
        }

        [HttpGet("article")]
        public async Task<string> GenerateArticle()
        {
            return await _productService.GenerateArticle();
        }

        [HttpPost]
        public async Task<IActionResult> Post(ProductCreationDto productCreationDto)
        {
            await _productService.CreateAsync(productCreationDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _productService.DeleteAsync(id);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Delete(ProductCreationDto productCreationDto)
        {
            await _productService.DeleteAsync(productCreationDto.Id);
            await _productService.CreateAsync(productCreationDto);
            return Ok();
        }
    }
}
